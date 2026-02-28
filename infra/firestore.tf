resource "google_firestore_database" "this" {
  project     = var.gcp_project_id
  name        = var.gcp_project_id
  location_id = var.gcp_region
  type        = "FIRESTORE_NATIVE"
}

resource "google_storage_bucket" "this" {
  count                       = var.env == "prod" ? 1 : 0
  name                        = local.service # Every bucket name must be globally unique
  location                    = local.region
  uniform_bucket_level_access = true
}
