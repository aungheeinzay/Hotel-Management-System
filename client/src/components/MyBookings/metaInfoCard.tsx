import {Card} from "@/components/ui/card.tsx";

interface metaInfoList {
    label: string
    value: number
    icon: React.JSX.Element
}
export default function MetaInfoCard({label,value,icon}:metaInfoList){
return (
    <Card className={"grid_center"}>
        <p className={"flex gap-4"}><span>{label}</span>
            <span>{icon}</span></p>
        <p>{label=="Need to Pay" && "$"} {value}</p>
    </Card>
)
}

