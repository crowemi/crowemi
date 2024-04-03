terraform {
  cloud {
    organization = "crowemi-io"

    workspaces {
      name = "crowemi-io"
    }
  }
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.20.0"
    }
  }
}
