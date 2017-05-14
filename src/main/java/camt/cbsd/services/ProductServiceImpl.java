package camt.cbsd.services;

import camt.cbsd.dao.ProductDao;
import camt.cbsd.entity.Product;
import camt.cbsd.entity.RegisterEntity;
import camt.cbsd.entity.security.Authority;
import camt.cbsd.entity.security.AuthorityName;
import camt.cbsd.entity.security.User;
import camt.cbsd.security.repository.AuthorityRepository;
import camt.cbsd.security.repository.UserRepository;
import org.apache.commons.io.FilenameUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@ConfigurationProperties(prefix = "server")
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductDao productDao;


    String imageServerDir;

    public void setImageServerDir(String imageServerDir) {
        this.imageServerDir = imageServerDir;
    }

    @Transactional
    public List<Product> getProducts(){
        List<Product> products = productDao.getProducts();
        for(Product product:products){
            Hibernate.initialize(product.getEnrolledCourse());
        }
        return products;
    }

    @Override
    @Transactional
    public Product findById(long id) {
        Product product = productDao.findById(id);
        Hibernate.initialize(product.getEnrolledCourse());
        return product;
    }

    @Override
    public Product addProduct(Product product) {
        return productDao.addProduct(product);
    }

    @Transactional
    @Override
    public Product getProductForTransfer(String username) {
        Product product = productDao.findByUsername(username);
        Hibernate.initialize(product.getUser());
        Hibernate.initialize(product.getAuthorities());
        return product;
    }

    @Override
    public Product addProduct(Product product, String imageFileName, BufferedImage image) throws IOException {
        // save file to the server
        int newId = productDao.size()+1;
        String newFilename = newId +"."+ imageFileName;
        File targetFile = Files.createFile(Paths.get(imageServerDir+newFilename)).toFile();
        ImageIO.write(image, FilenameUtils.getExtension(imageFileName),targetFile);

        product.setImage(newFilename);
        productDao.addProduct(product);
        return product;
    }

    @Override
    public List<Product> queryProduct(String query) {
        if (query == null || query.equals(""))
            return productDao.getProducts();
        return productDao.getProducts(query);
    }

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    @Override
    public Product addProduct(RegisterEntity registerEntity) {
        Authority authority;
        if (registerEntity.getRole().equals("Admin")){
            authority = authorityRepository.findByName(AuthorityName.ROLE_ADMIN);
        }else{
            authority =
                    authorityRepository.findByName(AuthorityName.ROLE_USER);
        }
        Product product = registerEntity.getProduct();
        User user = User.builder().username(registerEntity.getUsername())
                .password(registerEntity.getPassword())
                .firstname(product.getName())
                .lastname("default surname")
                .email("default @default")

                .lastPasswordResetDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .authorities(Arrays.asList(authority))
                .enabled(true)
                .build();
        product = productDao.addProduct(product);
        user = userRepository.save(user);
        product.setUser(user);
        user.setProduct(product);

        Hibernate.initialize(product.getUser());
        Hibernate.initialize(product.getAuthorities());
        return product;

    }

}