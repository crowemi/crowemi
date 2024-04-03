variable "google_credentials" {
  description = "GCP credentials"
  type        = string
}

variable "docker_image_tag" {
  description = "The docker image tage to deploy"
  type        = string
  default     = "latest"
}