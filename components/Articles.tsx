import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { BookOpen } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { CollectionSlug, DataFromCollectionSlug } from 'payload'
import Link from 'next/link'

interface ArticlesProps {
  articles: DataFromCollectionSlug<CollectionSlug>[]
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  if (articles.length === 0) return null

  return (
    <section className="py-10">
      <div className=" container md:!w-1/2 mx-auto px-4">
        <SectionHeading>Articles</SectionHeading>
        <Card className="bg-white">
          <CardHeader >
            <CardTitle className="flex items-center text-[#10375C]">
              <BookOpen className="mr-2 text-[#F3C623]" />
              Recent Articles
            </CardTitle>
          </CardHeader>

          <CardContent className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
              articles.map((article: any) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <ul className="space-y-4">
                    <li >
                      <h3 className="font-semibold text-[#10375C]">{article.title}</h3>
                      <p className="text-sm text-[#EB8317]">By {article.author}</p>
                    </li>
                  </ul>
                </Link>
              ))
            }
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Articles;