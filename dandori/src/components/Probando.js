"use client"
import { useEffect, useState, useRef} from 'react';
import { getAllSimpleSupermarkets } from '@/app/services/supermarket';
import { getAllSimpleCategories } from '@/app/services/category';
import { searchProducts } from '@/app/services/product';
import { getAllSimpleBrands } from '@/app/services/brand';
import { getPosts } from '@/app/services/post';
import { getShoppingList } from '@/app/services/shoppingList';
import { signup, signin } from '@/app/services/auth';
import { showToast } from "@/components/CustomizedSnackbars";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';
import { decodeJwt } from 'jose';

const SupermarketList = () => {
// const Probando = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await getAllSimpleSupermarkets();
        setSupermarkets(response.data); // Datos simplificados del backend
      } catch (err) {
        setError(err.message || 'Failed to fetch supermarkets');
      } finally {
        setLoading(false);
      }
    };

    fetchSupermarkets();
  }, []);

  if (loading) return <p>Loading supermarkets...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Supermarkets</h2>
      <ul>
        {supermarkets.map((market) => (
          <li key={market.supermarketId}>
            <h3>{market.name}</h3>
            <p>{market.description}</p>
            {market.image && <img src={market.image} alt={market.name} style={{ width: '150px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};



const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllSimpleCategories();
        setCategories(response.data); // Datos simplificados del backend
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            {category.image && <img src={category.image} alt={category.name} style={{ width: '150px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};




const SearchProductsr = ({ searchQuery="Pescados" }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await searchProducts(searchQuery, 2, 5); // Página 1, límite de 5 productos
        setProducts(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Supermarket: {product.supermarket}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
      {pagination.pages > 1 && (
        <p>
          Page {pagination.page} of {pagination.pages}
        </p>
      )}
    </div>
  );
};





const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getAllSimpleBrands();
        setBrands(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.brandId}>
            <img src={brand.image} alt={brand.name} style={{ width: '100px', height: '100px' }} />
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};





const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(page);
        setPosts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <small>Author: {post.userId?.email || 'Unknown'}</small>
          </li>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};






const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isSignup ? await signup(email, password) : await signin(email, password);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Signup' : 'Signin'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{isSignup ? 'Signup' : 'Signin'}</button>
      </form>
      <button onClick={() => setIsSignup((prev) => !prev)}>
        Switch to {isSignup ? 'Signin' : 'Signup'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};




function ProbandoToast() {
  const router = useRouter();
  const handleSuccess = async () => {
    showToast("Operation was successful!", "success", 2000); // Mensaje de éxito
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/cart")
  };

  const handleError = () => {
    showToast("Something went wrong!", "error", 4000); // Mensaje de error
  };
  

  return (
    <div>
      <h1>Toast Example Without Provider</h1>
      <button onClick={handleSuccess}>
        Show Success Toast
      </button>
      <button
        onClick={handleError}
        style={{ marginLeft: "10px" }}
      >
        Show Error Toast
      </button>
    </div>
  );
}


// function Probando() {
  function getAuthToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'Authorization') {
          console.log('Authorization Token:', decodeURIComponent(value.replace('Bearer ', '')));
          const decode = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRmZDE1YmIwMTIyZTI2MmI0NWZlYzkiLCJlbWFpbCI6ImRvbmF0by5tYWNoYWRvc2FudG9zQGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE3MzM5NjkyNjIsImV4cCI6MTczMzk5ODA2Mn0.2AJp0hIjqHV83n2w75voD12JbYphSOTze9K6CXY3pec")
          return <pre>{JSON.stringify(decode)}</pre>
          // return <p>{decodeURIComponent(value.replace('Bearer ', ''))}</p>
      }
  }
  return null;
}

const Probando = ({ userId, supermarketId }) => {
// const ShoppingList = ({ userId, supermarketId }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchShoppingList = async () => {
      setLoading(true);
      try {
          const data = await getShoppingList(userId, supermarketId);
          setShoppingList(data.data.shoppingList);
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

  // const handleAddProduct = async () => {
  //     try {
  //         await addProductToShoppingList(userId, "productId123", supermarketId, 1);
  //         fetchShoppingList();
  //     } catch (err) {
  //         setError(err.message);
  //     }
  // };


  // const handleDropProduct = async (productId) => {
  //     try {
  //         await dropProductFromShoppingList(userId, productId, supermarketId);
  //         fetchShoppingList();
  //     } catch (err) {
  //         setError(err.message);
  //     }
  // };

  useEffect(() => {
      fetchShoppingList();
  }, [userId, supermarketId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
        <Typography variant="h5">Shopping List</Typography>
        <Button variant="contained" onClick={handleAddProduct} sx={{ mb: 2 }}>
            Add Product
        </Button>
        <List>
            {shoppingList.map((item) => (
                <ListItem key={item.productId} secondaryAction={
                    <IconButton edge="end" onClick={() => handleDropProduct(item.productId)}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemText
                        primary={`${item.name} (${item.quantity}x)`}
                        secondary={`Price: $${item.price} | Calories: ${item.calories}`}
                    />
                </ListItem>
            ))}
        </List>
    </div>
  );
};


export default Probando;