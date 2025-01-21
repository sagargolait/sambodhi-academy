import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'
import Link from 'next/link'

const QueryCard = () => {
    return (
        <div>
            <Card className=" bg-white text-[#10375C] shadow-lg">
                <CardHeader className='!mb-2'>
                    <div className="flex justify-between items-center">
                        <CardTitle className="!text-xl font-bold text-[#10375C]">Have Queries? Let Us Call You</CardTitle>
                        <Link href={`/student-register`} target='_blank'>
                            <Button className=''>Click Here to Schedule Counselling</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold mb-2 text-[#10375C]">Attention: Important Notice</p>
                    <p className="text-sm text-red-800">
                        Dear Aspirants, you might have been trying to reach out to us. Due to heavy inflow of calls and mails, we may not be able to assist many of you there. We request you to fill up this form and somebody from our team will reach out to you within 24 hrs. <a className='underline text-primary cursor-pointer'>Click Here</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default QueryCard