import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const SignOutButton = () => {
    return (
        <form
            action={async (formData) => {
                "use server"
                await signOut()
            }}
        >
            <Button type="submit">Sign out</Button>
        </form>)
}

export default SignOutButton