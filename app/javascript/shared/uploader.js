import { get } from "svelte/store"
import { directUploadUrl } from "../stores/data.js"

import * as ActiveStorage from "@rails/activestorage"
ActiveStorage.start()

export default class Uploader {
  constructor(file) {
    this.file = file
    this.blob = ""
    this.progress = 0
  }

  async upload() {
    if (this.file.size > (2 * 1048576)) {
      alert("Filesize is too large. Max 2MB.")
      return
    }

    const upload = new ActiveStorage.DirectUpload(this.file, get(directUploadUrl), this)

    upload.create((error, blob) => {
      if (error) {
        alert("Something went wrong when uploading the image.")
      } else {
        this.blob = blob
      }
    })
  }

  directUploadWillStoreFileWithXHR(request, xhr) {
    request.upload.addEventListener("progress", event => this.directUploadDidProgress(event))
  }

  directUploadDidProgress(event) {
    this.progress = Math.round((100 / event.total) * event.loaded)
  }
}

