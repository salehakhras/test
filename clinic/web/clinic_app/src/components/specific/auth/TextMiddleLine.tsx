interface TextMiddleLineProps {
    text: string,
}

const TextMiddleLine = ({text} : TextMiddleLineProps) => {
    return (
        <div className="flex items-center space-x-2">
          <hr className="flex-grow border-gray-400"></hr>
          <span className="text-gray-400"> {text} </span>
          <hr className="flex-grow border-gray-400"></hr>
        </div>
    )
}

export default TextMiddleLine;