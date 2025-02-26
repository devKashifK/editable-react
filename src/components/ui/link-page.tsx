import { Button } from "./button";
import { LinkSelector } from "./link-selector";

export const LinkPage = ({onClick, addLink, setAddLink, onChange}: {onClick: string, addLink: boolean, setAddLink: (value: boolean) => void, onChange: (value: any) => void}) => {
    return (
      <div className="px-8 flex flex-col gap-2 py-1 relative z-[100000]">
        {onClick ? (
          <div className="flex justify-between items-center ">
          <div>{onClick}</div>
          <Button className="w-max" onClick={() => setAddLink(true)}>Edit Link</Button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
          <div>{onClick ? onClick : "No Links Are Added"}</div>
          <Button className="w-max" onClick={() => setAddLink(true)}>Add Link</Button>
          </div>
        )}
        {addLink && (
          <LinkSelector onSelect={(value) => {setAddLink(false); onChange({["onClick"]: value})}} />
        )}
        </div>
    )
  }