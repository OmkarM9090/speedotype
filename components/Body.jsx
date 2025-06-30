import "./Body.css";
import {useState,useEffect,useRef} from "react";

function Body(props)
{
    const questionbox = [
        "I have 2 apples and 3 oranges, which means I can make a delicious fruit salad.",
        "Today is 12th March, 2025, and the weather forecast says it will rain later.",
        "A rectangle has 4 sides and 4 angles, making it one of the simplest shapes.",
        "The bus arrived at 8:15 AM, just in time for the students to get to school.",
        "There are 24 hours in a day, but sometimes it feels like we need more time.",
        "Room temperature is 22 degree Celcius, which is considered comfortable for most people indoors."
      ];

      

    let [question,setQuestion] = useState("");
    let [answer,setAnswer] = useState("");
    let [wpm,setWpm] = useState(0);
    let [accuracy,setAccuracy] = useState(0);
    let [completed,setCompleted] = useState(false);

    let startTime = useRef(null);
    

    function handleChange(event)
    {
    if(!startTime.current)
    {
        startTime.current = Date.now();
    }
    
        setAnswer(event.target.value);
        calculateResults(event.target.value);
    }
    function calculateResults(userInput) {
        if (!startTime.current) return;
    
        const timeTaken = (Date.now() - startTime.current) / 60000; 
        const totalChars = userInput.replace(/\s/g, "").length; 
        const totalWords = totalChars / 5; 
        const currentWpm = timeTaken > 0 ? Math.round(totalWords / timeTaken) : 0;
        setWpm(currentWpm);
    
        const totalTyped = userInput.length;
        const correctCharArray = [...userInput].filter((char, i) => char === question[i]);
        const countChar = correctCharArray.length;
    
        setAccuracy(totalTyped > 0 ? Math.round((countChar / totalTyped) * 100) : 0);
    
        if (userInput === question) {
            setCompleted(true);
            if(currentWpm>props.best)
            {
                props.setBest(currentWpm);
            }

        }
    }

    function reset()
    {
        setQuestion(questionbox[Math.floor(Math.random()*questionbox.length)]);
        setAnswer("");
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);
                startTime.current = null;
    }
    useEffect( ()=> // it use for har baar render hoga means like iss exaple mai refresh karenge jitne baar utni baar reset function work hoga
        {   
            reset();
            // setQuestion(questionbox[0]);
        } , [] ); //[]=every render reset hoga 

        

    return  <div className="typing-container">
            {/* <p className="question">{question}</p>
            <textarea 
            className="answer"
            placeholder="Start typing here..."   //{place holder value hold karke rakhta hai then onchange jabhi bhi textfiels mai kuch type ya kuch bhi
                                                 // change karene and kuch bhi momment tab o handlechange function call karega  }
            onChange={handleChange}          
            value={answer}               //value use karna is compulsory after onchange,onchange ne handle change function call kiya uss function ke andar jaake usne
                                         //setAnswer agent of answer variable mai value bhar diya it is abstract to answer ke andar chala gaya value uske baad o naswer khali hogaya means
                                         //uska kaam hogaya set hogaya answer just like eg mummy ne bola jhadu maar to apan ne mara jhadu to o kaam set hogya now firse apan free hogaya khali hogaye after jhadu 
                                         //marne ke baad similarly answer mai set hone ke baad o answer khali hogaya then uska value khali hoga to o vale usme jayega ,Inshort meaning in actual is o textfield bharne ke baad reset button pe click kiya apan ne to o textfield khali hona chaiye
            disabled={completed}
            /> */}
             <p onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="question">
                {
                [...question].map((char,i)=><span className={char===answer[i]? "correct" : answer[i]? "wrong" : ""}>{char}</span>)
                }
            </p>
            <textarea 
            className="answer"
            placeholder="Start typing here..."
            onPaste={(e) => e.preventDefault()} 
            onChange = {handleChange}
            value = {answer}
            disabled = {completed}
            />
            <div className="stats">
                <p>WPM : {wpm}</p>
                <p>Accuracy : {accuracy}</p>
            </div>
            <button className="restart-btn" onClick={reset}>Restart Button</button>
    </div>


}

export default Body;