import {create} from 'zustand';
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {DateInput, DateValue, Card, CardBody, Divider, Button, Input} from '@heroui/react'

interface Bill{
    company: string,
    bill_amount: number,
    category: string,
    id: string
    date_of_activity: DateValue|null
}

interface BillStore{
    bills: Bill[]
    addBill: (activity: Bill) => void
    removeBill: (id: string)=>void
}

const useBillStore = create<BillStore>((set) => ({
    bills: [], // Initial state
    addBill: (bill: Bill) => set((state) => ({bills: [...state.bills, bill] })),
    removeBill: (id: string) => set((state)=>({bills: state.bills.filter((bill)=>bill.id != id)}))
}));

function DisplayBills(){
    const {bills, removeBill} = useBillStore()
    return (
            <ul>
                {bills.map((bill)=>(
                    <Card key={bill.id}> 
                    <CardBody className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <span>{bill.company}</span>
                        <span>{bill.category}</span>, 
                        <span>{bill.bill_amount}</span>,
                        <span>{(bill.date_of_activity)?.toDate('EST').toDateString()}</span>
                        <Button onPress={()=>removeBill(bill.id)}>Remove</Button>
                    </CardBody>
                    </Card>
                ))}
            </ul>
        
    )
}

function InputFields({onClose}: {onClose:()=>void}){
   const [category, setCategory] = useState('')
   const [company, setCompany] = useState('')
   const [id, setId] = useState('')
   const [bill_amount, setBillAmount] = useState('')
   const [date_of_activity, setDate] = useState<DateValue | null>(null)
   const addBill = useBillStore((state)=>state.addBill)

   const submitNewBill=(event: React.FormEvent)=>{
    event.preventDefault()
    addBill({
        company,
        bill_amount: parseFloat(bill_amount),
        category,
        date_of_activity,
        id: uuidv4(),
    })
    setCategory('')
    setCompany('')
    setId('')
    setBillAmount('')
    setDate(null)
    onClose()
   }
   return (
    <div className='flex items-center justify-center text-center'>
    <form onSubmit={submitNewBill} className="flex flex-col gap-4">
        <Input type='text' placeholder='Company' value={company} onChange={val=>setCompany(val.target.value)} required></Input>
        <Input type='text' placeholder='Category' value={category} onChange={val=>setCategory(val.target.value)} required></Input>
        <Input type='number' placeholder="Bill Amount" value={bill_amount} onChange={val=>setBillAmount(val.target.value)} required></Input>
        {/* <input type='date' value={date_of_activity} onChange={val=>setDate(val.target.value)} required></input> */}
        <DateInput className="max-w-sm" label={"Date of Activity"} value={date_of_activity} onChange={val=>setDate(val)} isRequired></DateInput>
        <button type='submit'>Add Bill</button>
    </form>
    
    </div>
)
}
export {DisplayBills, InputFields}