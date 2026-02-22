terraform {
  cloud {
    organization = "crowemi-io"

    workspaces {
      name = "crowemi"
    }
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.41.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "6.41.0"
    }
  }
}
