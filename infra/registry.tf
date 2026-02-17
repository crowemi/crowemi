resource "google_artifact_registry_repository" "docker_registry" {
  location      = var.gcp_region
  repository_id = var.gcp_project_id
  description   = "${var.gcp_project_id} docker registry"
  format        = "DOCKER"
  cleanup_policies {
    id     = "keep-minimum-versions"
    action = "KEEP"
    most_recent_versions {
      keep_count = 3
    }
  }
}