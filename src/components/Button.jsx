function Button(props){
    return(
        <button
         className="w-full
bg-violet-600
text-white
py-3
rounded-lg
font-semibold
hover:bg-violet-700
transition
duration-200
cursor-pointer
focus:outline-none
focus:ring-2
focus:ring-violet-400
active:scale-95
select-none" 
onClick={props.onClick}>
            {props.text}
        </button>
    );
}
export default Button;