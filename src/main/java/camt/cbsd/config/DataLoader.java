package camt.cbsd.config;

import camt.cbsd.dao.ProductDao;
import camt.cbsd.entity.Product;
import camt.cbsd.entity.security.Authority;
import camt.cbsd.entity.security.AuthorityName;
import camt.cbsd.entity.security.User;
import camt.cbsd.security.repository.AuthorityRepository;
import camt.cbsd.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by Dto on 07-Apr-17.
 */
@ConfigurationProperties(prefix = "server")
@Component
public class DataLoader implements ApplicationRunner {
    ProductDao productDao;

    @Autowired
    public void setProductDao(ProductDao productDao) {
        this.productDao = productDao;
    }

    String baseUrl;
    String imageUrl;
    String imageBaseUrl;

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    UserRepository userSecurityRepository;

    @Autowired
    public void setUserSecurityRepository(UserRepository userSecurityRepository) {
        this.userSecurityRepository = userSecurityRepository;
    }

    AuthorityRepository authorityRepository;

    @Autowired
    public void setAuthorityRepository(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        imageBaseUrl = baseUrl + imageUrl;
        Product product1 = Product.builder().name("Artistry - Automatic Lip Liner Pencil Refill")
                .description("Define, shape, and soften like an expert.")
                .image(imageBaseUrl + "pic1.jpg")
                .amount(2)
                .rate(2.2)
                .price(466).build();
        Product product2 = Product.builder().name("Artistry - Signature Color Sheer Lipstick")
                .description("Soften, moisturize, and rejuvenate the appearance of lips with the perfect color and coverage.")
                .image(imageBaseUrl + "pic2.jpg")
                .amount(5)
                .rate(2.3)
                .price(880).build();
        Product product3 = Product.builder().name("Artistry - Light Up Lip Gloss")
                .description("Long-lasting, Glides on for exceptional blendability")
                .image(imageBaseUrl + "pic3.jpg")
                .amount(2)
                .rate(2.2)
                .price(1800).build();

        productDao.addProduct(product1);
        productDao.addProduct(product2);
        productDao.addProduct(product3);

        securitySetup();
    }

    User user1, user2, user3, user4;

    private void securitySetup() {
        user1 = User.builder()
                .username("user")
                .password("user")
                .firstname("user")
                .lastname("user")
                .email("enabled@user.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

        user2 = User.builder()
                .username("admin")
                .password("admin")
                .firstname("admin")
                .lastname("admin")
                .email("admin@admin.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

        user3 = User.builder()
                .username("staff")
                .password("staff")
                .firstname("staff")
                .lastname("staff")
                .email("enabled@staff.com")
                .enabled(true)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

        user4 = User.builder()
                .username("disabled")
                .password("disabled")
                .firstname("user")
                .lastname("user")
                .email("disabled@user.com")
                .enabled(false)
                .lastPasswordResetDate(Date.from(LocalDate.of(2016, 01, 01).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .build();

        Authority auth1 = Authority.builder().name(AuthorityName.ROLE_USER).build();
        Authority auth2 = Authority.builder().name(AuthorityName.ROLE_ADMIN).build();
        Authority auth3 = Authority.builder().name(AuthorityName.ROLE_STAFF).build();
        authorityRepository.save(auth1);
        authorityRepository.save(auth2);
        authorityRepository.save(auth3);
        user1.setAuthorities(new ArrayList<>());
        user1.getAuthorities().add(auth1);
        user2.setAuthorities(new ArrayList<>());
        user2.getAuthorities().add(auth2);
        user3.setAuthorities(new ArrayList<>());
        user3.getAuthorities().add(auth1);
        user3.getAuthorities().add(auth3);
        user4.setAuthorities(new ArrayList<>());
        user4.getAuthorities().add(auth1);

        userSecurityRepository.save(user1);
        userSecurityRepository.save(user2);
        userSecurityRepository.save(user3);
        userSecurityRepository.save(user4);
    }
}
