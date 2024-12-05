import { Skeleton } from "@/components/ui/skeleton"

const SkeletonProduct = () => {
  return (
    <div className="grid sm:grid-cols-2 sm:py-16 sm:px-40 gap-8">
      <Skeleton className="h-[500px] w-[500px] rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="w-[500px] h-[50px]" />
        <Skeleton className="h-[15px] w-[500px]" />
        <Skeleton className="h-[40px] w-[500px]" />
        <Skeleton className="h-[20px] w-[500px]" />
        <Skeleton className="h-[80px] w-[500px]" />
      </div>
    </div>
  )
}

export default SkeletonProduct
