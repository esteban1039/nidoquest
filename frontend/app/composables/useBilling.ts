type CheckoutResponse = {
  data: {
    payment_id: number
    status: string
    amount_cents: number
    currency: string
    reference: string
    checkout: {
      public_key: string
      currency: string
      amount_in_cents: number
      reference: string
      signature_integrity: string
      redirect_url: string
      expiration_time: string
      checkout_url: string
    }
  }
}

type SubscriptionStatusResponse = {
  data: {
    subscription?: {
      id: number
      status: string
      trial_ends_at?: string | null
      ends_at?: string | null
    } | null
    access: {
      state: string
      allowed: boolean
      message: string
      trial_ends_at?: string | null
      trial_days_remaining?: number
    }
  }
}

export function useBilling() {
  const { request } = useApi()
  const loading = ref(false)
  const checkout = ref<CheckoutResponse['data'] | null>(null)

  async function createCheckout() {
    loading.value = true

    try {
      const response = await request<CheckoutResponse>('/payments/wompi/checkout', { method: 'POST' })
      checkout.value = response.data
      return response.data
    } finally {
      loading.value = false
    }
  }

  async function openCheckout() {
    const data = checkout.value || await createCheckout()

    if (import.meta.client) {
      window.location.href = data.checkout.checkout_url
    }
  }

  async function subscriptionStatus() {
    return await request<SubscriptionStatusResponse>('/subscription/status')
  }

  async function transactionStatus(id: string) {
    return await request(`/payments/wompi/transactions/${id}`)
  }

  return { checkout, loading, createCheckout, openCheckout, subscriptionStatus, transactionStatus }
}
