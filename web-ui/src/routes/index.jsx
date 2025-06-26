import {createFileRoute} from '@tanstack/react-router'
import {redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: () => null,
    loader: () => {
        redirect({
            to: '/bot',
            throw: true,
        })
    },
})


