import Rails from "@rails/ujs"

export default class RailsFetch {
  constructor(url, body = "") {
    this.url = url
    this.body = body
  }

  async get() {
    const response = await fetch(this.url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })

    const data = await response.text()
    return data
  }

  async post() {
    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify(this.body),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": Rails.csrfToken()
      },
      credentials: "same-origin"
    })

    const data = await response.text()

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return data
  }
}
