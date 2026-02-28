resource "google_storage_bucket" "this" {
  name                        = local.service # Every bucket name must be globally unique
  location                    = local.region
  uniform_bucket_level_access = true
}