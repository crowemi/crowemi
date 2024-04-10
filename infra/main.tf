locals {
    region  = "us-west1"
    service = "crowemi"
    project = var.google_project_id
}
resource "google_service_account" "service_account" {
    account_id   = "srv-${local.service}"
    display_name = "srv_crowemi"
    description  = "A service account for ${local.service}"
}

resource "google_cloud_run_v2_service" "crowemi" {
    name     = local.service
    location = local.region
    ingress = "INGRESS_TRAFFIC_ALL"
    launch_stage = "BETA"
    template {
        containers {
            image = "us-west1-docker.pkg.dev/${local.project}/crowemi-io/${local.service}:${var.docker_image_tag}"

            ports {
                container_port = 3000
            }
        }
        service_account = google_service_account.service_account.email
        vpc_access{
            network_interfaces {
                network = "crowemi-io-network" # TODO: ref data
                subnetwork = "crowemi-io-subnet-01" # TODO: ref data
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
    location    = google_cloud_run_v2_service.crowemi.location
    project     = google_cloud_run_v2_service.crowemi.project
    service     = google_cloud_run_v2_service.crowemi.name

    policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_domain_mapping" "crowemi" {
    location = "us-west1"
    name     = "crowemi.com"

    metadata {
        namespace = local.project
    }

    spec {
        route_name = google_cloud_run_v2_service.crowemi.name
    }
}