resource "google_project_organization_policy" "allow_all_members" {
  project    = "crowemi-dev"
  constraint = "iam.allowedPolicyMemberDomains"

  restore_policy {
    default = true
  }
}
