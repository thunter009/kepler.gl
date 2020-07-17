# Gather Data
data "aws_vpc" "vpc" {
  tags = {
    Name = "${var.vpc_name}"
  }
}

data "aws_subnet_ids" "private" {
  vpc_id = "${data.aws_vpc.vpc.id}"

  tags = {
    Name = var.app_subnet_name
  }
}

data "aws_subnet_ids" "public" {
  vpc_id = data.aws_vpc.vpc.id

  tags = {
    Name = var.app_public_subnet_name
  }
}

data "aws_security_group" "office_sg" {
  id = var.load_balancer_sg
}

data "aws_ecs_cluster" "cluster_id" {
  cluster_name = "${var.cluster_name}"
}

# General resources 
resource "aws_ecr_repository" "kepler-gl" {
  name = "kepler-gl"
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/apps/kepler-gl-ecs-${var.kepler-gl_env}"

  tags = {
    Environment        = upper(var.kepler-gl_env)
    Project            = "DASHBOARD"
    Department         = "DATAENGINEERING"
    Owner              = "TOM@7PARKDATA.COM"
    BusinessLine       = "CRE"
    FinancialReporting = "GANDA"
    Name               = "/apps/kepler-gl-ecs-${var.kepler-gl_env}"
  }
}

# kepler-gl Service
# Role for ECS kepler-gl
resource "aws_iam_role" "kepler-gl_ecs_role" {
  name = "7p-kepler-gl-${var.kepler-gl_env}-ecs"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "container_access" {
  role       = aws_iam_role.kepler-gl_ecs_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_role_policy_attachment" "logs_access" {
  role       = aws_iam_role.kepler-gl_ecs_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

resource "aws_iam_role_policy_attachment" "ssm_access" {
  role       = aws_iam_role.kepler-gl_ecs_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

# kepler-gl Load Balancers
module "kepler-gl-lb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 5.6"

  name = var.kepler-gl_lb_name

  load_balancer_type = "application"
  internal           = false

  vpc_id          = data.aws_vpc.vpc.id
  subnets         = flatten([data.aws_subnet_ids.public.ids])
  security_groups = [data.aws_security_group.office_sg.id]

  target_groups = [
    {
      name             = var.kepler-gl_tg_name
      backend_protocol = "HTTP"
      backend_port     = 80
      target_type      = "ip"
      health_check = {
        enabled             = true
        path                = "/"
        port                = "traffic-port"
        healthy_threshold   = 5
        unhealthy_threshold = 10
        timeout             = 30
        interval            = 60
      }
    }
  ]

  https_listeners = [
    {
      port               = 443
      protocol           = "HTTPS"
      certificate_arn    = var.kepler-gl_certificate_arn
      target_group_index = 0
    }
  ]

  http_tcp_listeners = [
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
      action_type        = "redirect"
      redirect = {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
  ]

  tags = {
    Environment        = upper(var.kepler-gl_env)
    Project            = "DASHBOARD"
    Department         = "DATAENGINEERING"
    Owner              = "TOM@7PARKDATA.COM"
    BusinessLine       = "CRE"
    FinancialReporting = "GANDA"
    Name               = "/apps/kepler-gl-ecs-${var.kepler-gl_env}"
  }
}

module "kepler-gl-sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "7p-kepler-gl-${var.kepler-gl_env}-ecs"
  description = "Access to kepler-gl-${var.kepler-gl_env}-service ECS"
  vpc_id      = data.aws_vpc.vpc.id
  ingress_with_source_security_group_id = [
    {
      from_port                = var.kepler-gl_port
      to_port                  = var.kepler-gl_port
      protocol                 = "tcp"
      description              = "Access to ecs kepler-gl from load balancer"
      source_security_group_id = data.aws_security_group.office_sg.id
    }
  ]

  egress_cidr_blocks = ["0.0.0.0/0"]
  egress_rules       = ["all-all"]
}

resource "aws_ecs_task_definition" "kepler-gl_td" {
  family = "kepler-gl-${var.kepler-gl_env}-td"
  container_definitions = templatefile("./task_def.tmpl", {
    kepler-gl_env    = var.kepler-gl_env,
    kepler-gl_branch = var.kepler-gl_branch,
    ecs_role         = aws_iam_role.kepler-gl_ecs_role.arn,
    kepler-gl_port   = var.kepler-gl_port
    kepler-gl_memory = var.kepler-gl_memory
    kepler-gl_cpu    = var.kepler-gl_cpu
    kepler-gl_commit = var.CI_COMMIT_ID
  })
  network_mode             = "awsvpc"
  cpu                      = var.kepler-gl_cpu
  memory                   = var.kepler-gl_memory
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = aws_iam_role.kepler-gl_ecs_role.arn
  execution_role_arn       = aws_iam_role.kepler-gl_ecs_role.arn

  tags = {
    Environment        = upper(var.kepler-gl_env)
    Project            = "DASHBOARD"
    Department         = "DATAENGINEERING"
    Owner              = "TOM@7PARKDATA.COM"
    BusinessLine       = "CRE"
    FinancialReporting = "GANDA"
    Name               = "/apps/kepler-gl-ecs-${var.kepler-gl_env}"
  }
}

resource "aws_ecs_service" "kepler-gl_service" {
  name                               = "kepler-gl-${var.kepler-gl_env}-service"
  cluster                            = data.aws_ecs_cluster.cluster_id.id
  task_definition                    = aws_ecs_task_definition.kepler-gl_td.arn
  desired_count                      = var.task_count
  launch_type                        = "FARGATE"
  enable_ecs_managed_tags            = true
  propagate_tags                     = "SERVICE"
  deployment_minimum_healthy_percent = 50

  load_balancer {
    target_group_arn = module.kepler-gl-lb.target_group_arns[0]
    container_name   = "kepler-gl_${var.kepler-gl_env}"
    container_port   = var.kepler-gl_port
  }

  network_configuration {
    subnets          = flatten([data.aws_subnet_ids.private.ids])
    security_groups  = [module.kepler-gl-sg.this_security_group_id]
    assign_public_ip = false
  }

  tags = {
    Environment        = upper(var.kepler-gl_env)
    Project            = "DASHBOARD"
    Department         = "DATAENGINEERING"
    Owner              = "TOM@7PARKDATA.COM"
    BusinessLine       = "CRE"
    FinancialReporting = "GANDA"
    Name               = "/apps/kepler-gl-ecs-${var.kepler-gl_env}"
  }
}
