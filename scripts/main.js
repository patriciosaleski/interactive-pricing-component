const data = fetch('./scripts/prices.json')
    .then(async response => {
        const JSONCheck = response.headers.get('content-type')?.includes('application/json')
        const data = JSONCheck ? await response.json() : null

        if (response.ok) {
            return data

        } else if (!response.ok) {
            // receives API error or response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
        }
    }
    )
    .catch(error => {
        console.error(error)
    }
    )

data.then(data => {
    function updatePrices(){
        if (switchBillingType.checked) {
            let actualPrice  = parseFloat(pageViewsPrice.innerHTML.split('$')[1]).toFixed(2)
            pageViewsPrice.innerHTML = `$${((actualPrice * 12) * .75).toFixed(2)}`
            billingType.innerHTML = '/ year'
        } else {
            pageViewsPrice.innerHTML = `$${(data[tierSelector.value].price).toFixed(2)}`
            billingType.innerHTML = '/ month'
        }
    }

    const tierSelector = document.getElementById('slider')
    tierSelector.addEventListener('change', () => {
        pageViews.innerHTML = `${data[tierSelector.value].target_audience} PAGEVIEWS`
        pageViewsPrice.innerHTML = `$${(data[tierSelector.value].price).toFixed(2)}`
        updatePrices()
    })

    switchBillingType.addEventListener('change', () => {
        updatePrices()
    })
}
)

const pageViews = document.getElementById('pageviews')
const pageViewsPrice = document.getElementById('value')
const billingType = document.getElementById('billing')
const switchBillingType = document.querySelector('.switch > input')
