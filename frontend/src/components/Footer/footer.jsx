import styles from './footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const developers = [
    {
        "name": "Khalid",
        "github": "https://github.com/volumia",
        "linkedIn": "https://www.linkedin.com/in/khalid-khogali/"
    },
    {
        "name": "Sophie",
        "github": "https://github.com/zofienora",
        "linkedIn": "https://www.linkedin.com/in/sophie-nora-keil/"
    },
    {
        "name": "Rafia",
        "github": "https://github.com/rafia-farooq",
        "linkedIn": "https://www.linkedin.com/in/rafia-farooq/"
    },
    {
        "name": "Mohamed",
        "github": "https://github.com/MohamedNabil720",
        "linkedIn": "https://www.linkedin.com/in/muhammad--nabil/"
    },
    {
        "name": "Micheal",
        "github": "https://github.com/Izunnaya",
        "linkedIn": " https://www.linkedin.com/in/michael-ugorji/"
    }
]

const scrumMasters = [
    {
        "name": "Robyn",
        "linkedIn": "https://www.linkedin.com/in/robyn-joynt/"
    },
    {
        "name": "Oluwatosin",
        "linkedIn": "https://www.linkedin.com/in/oluwatosin-awoniyi-8a48228a/"
    }
]


const Footer = () => {
  return (
    <footer className='flex-col pt-5 lg:flex-row'>
        <div className='pb-8 lg:pb-0 lg:pr-12'>
            <FaGithub size={28} color='#05DBF2' className={styles.icon}/>
            <span><a href='https://github.com/chingu-voyages/V55-tier2-team-22'>GitHub Repository</a></span>
            <p className='pt-5 text-xs'>© 2025 App Name.</p>
            <p>This project was built by team 22 as part of the Chingu Voyage 55</p>
        </div>
        <div className='flex flex-row justify-evenly pt-4 md:flex-col lg:grow lg:pl-12'>
            <div className='flex flex-col items-center md:flex-row md:justify-between'>
                <h4 className='font-bold'>Developers</h4>
                {
                    developers.map((member, index) => {
                    return (
                        <div key={index} className='flex flex-col justify-evenly py-2'>
                            <p>{member.name}</p>
                            <div className='flex justify-center item-center'>
                                <a href={member.github} className='pr-2'><FaGithub color='#05DBF2'size={20} /></a>
                                <a href={member.linkedIn}><FaLinkedin color='#05DBF2' size={20}/></a>
                            </div>

                        </div>
                        )
                    })
                }
            </div>
            <div className='flex flex-col items-center md:flex-row'>
                <h4 className='font-bold'>Scrum Masters</h4>
                {
                    scrumMasters.map((member, index) => {
                    return (
                        <div key={index} className='flex flex-col justify-evenly py-2'>
                            <p className='px-8'>{member.name}</p>
                            <div className='flex justify-center item-center'>
                                <a href={member.linkedIn}><FaLinkedin color='#05DBF2' size={20}/></a>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    </footer>
  );
};


export default Footer;