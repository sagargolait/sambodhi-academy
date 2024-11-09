import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Bell, BookOpen } from 'lucide-react'
import SectionHeading from './SectionHeading'

const notifications = [
  { id: 1, title: 'New Course Available', date: '2024-03-01' },
  { id: 2, title: 'Upcoming Mock Test', date: '2024-03-05' },
  { id: 3, title: 'Results Declared', date: '2024-03-10' },
]

const articles = [
  { id: 1, title: 'Top 10 Strategies for Exam Preparation', author: 'Dr. Sharma' },
  { id: 2, title: 'Understanding the New Exam Pattern', author: 'Prof. Gupta' },
  { id: 3, title: 'Time Management Tips for Aspirants', author: 'Ms. Patel' },
]

const NotificationsAndArticles: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
      <SectionHeading>Notifications and Articles</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-[#10375C]">
                <Bell className="mr-2  text-[#F3C623]" />
                Latest Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex justify-between items-center">
                    <span className="text-[#10375C]">{notification.title}</span>
                    <span className="text-sm text-[#EB8317]">{notification.date}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-[#10375C]">
                <BookOpen className="mr-2 text-[#F3C623]" />
                Recent Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {articles.map((article) => (
                  <li key={article.id}>
                    <h3 className="font-semibold text-[#10375C]">{article.title}</h3>
                    <p className="text-sm text-[#EB8317]">By {article.author}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default NotificationsAndArticles