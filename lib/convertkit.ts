// ConvertKit API integration
export async function subscribeToNewsletter(email: string, firstName?: string) {
  // Your actual ConvertKit credentials
  const CONVERTKIT_API_KEY = "0COhxA4fJWNa4mqTPyz_lQ"
  const CONVERTKIT_API_SECRET = "sJffb5otaiQq5Pbqr-xStpaXoL6ml24vgT3l02g_VcM"
  const CONVERTKIT_FORM_ID = "8313706" // Your actual form ID

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: email,
        first_name: firstName || "",
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, message: "Successfully subscribed!" }
    } else {
      return { success: false, message: data.message || "Subscription failed" }
    }
  } catch (error) {
    console.error("ConvertKit subscription error:", error)
    return { success: false, message: "Network error. Please try again." }
  }
}
