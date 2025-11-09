export default function SkillBadge({skill}:{skill:string}){
    return (
        <span  className="rounded-full border border-zinc-300 bg-[#e7eefc] px-2 py-0.5 text-xs text-gray-700 hover:bg-[#dbe7fc] transition-all duration-200 ease-in-out">
            {skill}
        </span>
    )
}