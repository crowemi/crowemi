resource "google_firestore_database" "this" {
  project     = var.gcp_project_id
  name        = var.gcp_project_id
  location_id = var.gcp_region
  type        = "FIRESTORE_NATIVE"
}
