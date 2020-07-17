provider "aws" {
  region = "us-east-1"
  allowed_account_ids = var.allowed_account_ids
}

terraform {
  backend "s3" {
    bucket = "7p-devops"
    key = "terraform/prod/kepler-gl_terraform.tfstate"
    region = "us-east-1"
  }
}

module "kepler-gl" {
  source = "../../modules/kepler_gl"
  vpc_name = var.vpc_name
  kepler-gl_lb_name = var.kepler-gl_lb_name
  kepler-gl_tg_name = var.kepler-gl_tg_name
  kepler-gl_env = var.kepler-gl_env
  kepler-gl_certificate_arn = var.kepler-gl_certificate_arn
  kepler-gl_branch = var.kepler-gl_branch
  cluster_name = var.cluster_name
  app_subnet_name = var.app_subnet_name
  load_balancer_sg = var.load_balancer_sg
  task_count = var.task_count
  app_public_subnet_name = var.app_public_subnet_name
}
