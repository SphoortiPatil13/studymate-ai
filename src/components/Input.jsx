function Input(props){
    return(
        <div className="mb-5">
        <label className= "text-sm font-medium text-black-600">{props.label}</label>
        <input className="border-2 w-full border-slate-300 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-violet-500 focus:ring-2"
         type={props.type}
         placeholder={props.placeholder}
         /> 
         </div>
    );
}
export default Input;