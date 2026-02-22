resource "google_cloud_run_service_iam_member" "public" {
  project  = local.project
  location = "us-west1"
  service  = google_cloud_run_v2_service.this.name
  role     = "roles/run.invoker"
  member   = "allUsers"

  depends_on = [google_project_organization_policy.allow_all_members]
}