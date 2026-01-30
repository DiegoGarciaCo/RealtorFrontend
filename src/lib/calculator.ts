import { MortgageData } from "@/components/mortgageCalculator";

const domain = "https://api.soldbyghost.com";

export const SubmitCalculatorForm = async (formData: MortgageData) => {
    const res = await fetch(`${domain}/api/calculator`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: formData.price,
            interest: formData.interest,
            years: formData.term,
            downPayment: formData.downPayment,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            number: formData.phoneNumber,
            subscribed: true,
        }),
    })
    if (!res.ok) {
        throw new Error("Failed to submit form");
    } else {
        return res
    }
}
