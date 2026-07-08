import {Card} from "@/components/ui/card.tsx";
import formatNumber from "@/lib/formatNumber.ts";

interface metaInfoList {
    label: string
    value: number | undefined | string
    icon: React.JSX.Element
}
export default function MetaInfoCard({label,value,icon}:metaInfoList){
return (
    <Card className={"grid_center"}>
        <p className={"flex gap-4"}><span>{label}</span>
            <span>{icon}</span></p>
        <p>{typeof value=="number" && "$"} {formatNumber(value)}</p>
    </Card>
)
}

