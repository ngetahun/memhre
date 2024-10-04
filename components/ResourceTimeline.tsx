import Link from 'next/link'
import { type Resource} from '@/lib/types'


export default function ResourceTimeline({ resources, userId }: { resources: Resource[], userId: string }) {
  return (
    <div className="timeline">
      {resources.map((resource, index) => (
        <div key={index} className="timeline-item">
          <Link href={`/chats/${userId}`}>
          </Link>
        </div>
      ))}
    </div>
  )
}
