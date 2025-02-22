# GraphQL
lets give an example 
you have the 2 models
1) user model
2) posts model
3) comments model

### user model 
```
class User {
    id,
    name,
    password,
    email,
    phone_number,
    is_verified,
    ...
}
```

### post model
```
class Post {
    id,
    user_id,
    title,
    description,
    images: List[image] limit 10,
}
```

### comments model
```
class comments {
    id,
    user_id,
    comment,
    post_id,
}
```
if u went to the instagram profile you will see the profile details and all the posts below it

what should we fetch?
1st call -> we will fetch /user/<user_id> 
2nd call -> we will call for posts details
if you fetch those data and we got the useless data like title, description 

in this case you can use GraphQL
