locals {
    region  = var.gcp_region
    service = "crowemi"
    project = var.gcp_project_id
}
resource "google_service_account" "this" {
    account_id   = "srv-${local.service}"
    display_name = "srv-${local.service}-${var.env}"
    description  = "A service account for ${local.service}"
}

resource "google_cloud_run_v2_service" "this" {
    name     = local.service
    location = local.region
    ingress = "INGRESS_TRAFFIC_ALL"
    launch_stage = "BETA"
    template {
        containers {
            image = "us-west1-docker.pkg.dev/${local.project}/crowemi-io/${local.service}:${var.docker_image_tag}"
        }
        service_account = google_service_account.service_account.email
        vpc_access{
            network_interfaces {
                network = "projects/crowemi-io-${var.env}/global/networks/crowemi-io-${var.env}-network" # TODO: ref data
                subnetwork = "projects/crowemi-io-${var.env}/regions/${var.gcp_region}/subnetworks/crowemi-io-${var.env}-subnet-01" # TODO: ref data
            }
            egress = "ALL_TRAFFIC"
        }
    }
}
data "google_iam_policy" "noauth" {
    binding {
        role = "roles/run.invoker"
        members = [
            "allUsers",
        ]
    }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
    location    = google_cloud_run_v2_service.this.location
    project     = google_cloud_run_v2_service.this.project
    service     = google_cloud_run_v2_service.this.name

    policy_data = data.google_iam_policy.noauth.policy_data
}

# resource "google_cloud_run_domain_mapping" "crowemi" {
#     location = "us-west1"
#     name     = "crowemi.com"

#     metadata {
#         namespace = local.project
#     }

#     spec {
#         route_name = google_cloud_run_v2_service.this.name
#     }
# }