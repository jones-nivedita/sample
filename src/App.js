
import './App.css';
import { useEffect, useState } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {

  const [images,setImages]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [term,setTerm]=useState('');

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>{
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err=>console.log(err));
  },[term]);
  return (
    <>
    <div className='flex flex-col justify-center items-center py-5'>
      <ImageSearch searchText={(text) => setTerm(text)}/>

      {!isLoading && images.length===0 && <h1 className='text-5xl text-center mx-auto mt-32'>No Images Found</h1>}

      {isLoading ? <h1 className='text-5xl text-center mt-32'>Loading Images...</h1> : 
      <div className='grid grid-cols-3 gap-6'>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
     }
    </div>
    </>
  );
}

export default App;
