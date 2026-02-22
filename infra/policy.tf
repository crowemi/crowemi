resource "google_project_organization_policy" "allow_all_members" {
  project    = local.project
  constraint = "iam.allowedPolicyMemberDomains"

  restore_policy {
    default = true
  }
}
