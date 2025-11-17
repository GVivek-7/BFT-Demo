import Faq from '@/components/Contact/Faq'
import Form from '@/components/Contact/Form'
import Hero from '@/components/Contact/Hero'
import Location from '@/components/Contact/Location'
import Align from '@/components/Reusable/Align'


const page = () => {
  return (
    <div>
        <Hero />
        <Align>
<Form />
        <Location />
        <Faq />

        </Align>



        
    </div>
  )
}

export default page