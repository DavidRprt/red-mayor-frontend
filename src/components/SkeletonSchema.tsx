import { Skeleton } from "./ui/skeleton"

type SkeletonSchemaProps = {
  grid: number
}

const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid } = props

  return Array.from({ length: grid }).map((_, index) => (
    <div key={index} className="flex flex-col gap-8 space-y-3">
      <Skeleton className="h-[300px] md:w-[280px] roundex-xl w-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 md:w-[280px] w-full" />
        <Skeleton className="h-8 md:w-[280px] w-full" />
      </div>
    </div>
  ))
}

export default SkeletonSchema
