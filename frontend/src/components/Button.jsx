function Button({text , onClick , className=""}){
    return(
        <button
         className={`
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
select-none ${className}` }
onClick={onClick}>
            {text}
        </button>
    );
}
export default Button;