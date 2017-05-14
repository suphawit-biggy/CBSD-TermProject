package camt.cbsd.dao;

import camt.cbsd.entity.Product;

import java.util.List;

/**
 * Created by Dto on 3/15/2017.
 */
public abstract class AbstractProductDao implements ProductDao {
    List<Product> products;
    String baseUrl;
    String imageUrl;

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    String imageBaseUrl;

    @Override
    public List<Product> getProducts() {
        return products;
    }

    @Override
    public Product findById(long id) {

        return products.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
    }

    @Override
    public Integer size() {
        return products.size();
    }

    @Override
    public Product addProduct(Product product){
        //update id
        int newId = this.size()+1;
        product.setId(newId);
        products.add(product);
        return product;
    }
}
