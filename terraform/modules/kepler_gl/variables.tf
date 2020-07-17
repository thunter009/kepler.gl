
variable "vpc_name" {
  description = "Name of the VPC"
}

variable "kepler-gl_lb_name" {
  description = "Name of flower load balancer"
}

variable "kepler-gl_tg_name" {
  description = "Name of flower target groups"
}

variable "kepler-gl_env" {
  description = "kepler-gl env name"
}

variable "kepler-gl_certificate_arn" {
  description = "Certificate arn"
}

variable "kepler-gl_branch" {
  description = "Branch for container"
}

variable "cluster_name" {
  description = "ECS cluster name"
}

variable "kepler-gl_port" {
  description = "kepler-gl Port"
  default     = 8080
}

variable "kepler-gl_cpu" {
  description = "kepler-gl Port"
  default     = 1024
}

variable "kepler-gl_memory" {
  description = "kepler-gl Port"
  default     = 8192
}

variable "app_subnet_name" {
  description = "Subnt name for applications"
}

variable "app_public_subnet_name" {
  description = "Subnt name for loadbalancer"
}

variable "task_count" {
  description = "Count of ecs tasks"
  default     = 1
}

variable "load_balancer_sg" {
  description = "Load balancer sg id"
}
