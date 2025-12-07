# Testing Guide

This guide provides comprehensive testing standards, best practices, and guidelines for the EduMatch project to ensure high-quality, maintainable test code.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [Test Coverage](#test-coverage)
- [Testing Tools](#testing-tools)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)

---

## Testing Philosophy

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\
     /      \    Integration Tests (Some)
    /________\
   /          \  Unit Tests (Many)
  /____________\
```

**Distribution:**
- **70%** Unit Tests: Fast, isolated, test individual components
- **20%** Integration Tests: Test component interactions
- **10%** E2E Tests: Test complete user flows

### Why We Test

1. **Confidence**: Ensure code works as expected
2. **Documentation**: Tests describe how code should behave
3. **Refactoring Safety**: Change code without breaking functionality
4. **Bug Prevention**: Catch issues before production
5. **Design Feedback**: Well-tested code is often well-designed

---

## Unit Testing

### Test Structure: Given-When-Then

Organize tests using the **Arrange-Act-Assert** (AAA) pattern:

```java
@Test
void applyForScholarship_whenEligible_shouldCreateApplication() {
    // Given (Arrange): Set up test data and conditions
    Student student = createEligibleStudent();
    Scholarship scholarship = createActiveScholarship();
    
    // When (Act): Execute the method under test
    Application result = scholarshipService.apply(student, scholarship);
    
    // Then (Assert): Verify the expected outcome
    assertNotNull(result);
    assertEquals(ApplicationStatus.PENDING, result.getStatus());
    verify(applicationRepository).save(any(Application.class));
}
```

### Test Naming Convention

**Format**: `methodName_scenario_expectedBehavior`

✅ **Good Examples:**
```java
@Test
void calculateGpa_withValidGrades_shouldReturnCorrectAverage()

@Test
void submitApplication_whenDeadlinePassed_shouldThrowException()

@Test
void findScholarships_whenNoMatchingCriteria_shouldReturnEmptyList()
```

❌ **Bad Examples:**
```java
@Test
void test1()  // Not descriptive

@Test
void testCalculateGpa()  // Missing scenario and expected behavior

@Test
void shouldCalculateGpa()  // Missing method name
```

### What to Test

✅ **DO Test:**

1. **Business Logic**
```java
@Test
void calculateScholarshipAmount_withMultipleAwards_shouldSumCorrectly() {
    // Test calculation logic
}
```

2. **Validation Rules**
```java
@Test
void validateStudent_whenGpaBelowMinimum_shouldReturnValidationError() {
    // Test validation
}
```

3. **Edge Cases**
```java
@Test
void processApplications_whenEmptyList_shouldHandleGracefully() {
    // Test edge cases
}
```

4. **Exception Handling**
```java
@Test
void getScholarship_whenNotFound_shouldThrowNotFoundException() {
    // Test exception scenarios
}
```

❌ **DON'T Test:**

1. **Simple Getters/Setters**
```java
// Don't test this
public String getName() {
    return name;
}
```

2. **Framework Code**
```java
// Don't test Spring/JPA internals
```

3. **Third-Party Libraries**
```java
// Don't test Mockito, Jackson, etc.
```

### JUnit 5 Basics

#### Test Lifecycle

```java
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ScholarshipServiceTest {
    
    @BeforeAll
    static void setupAll() {
        // Runs once before all tests
    }
    
    @BeforeEach
    void setup() {
        // Runs before each test
    }
    
    @Test
    void testMethod() {
        // Individual test
    }
    
    @AfterEach
    void tearDown() {
        // Runs after each test
    }
    
    @AfterAll
    static void tearDownAll() {
        // Runs once after all tests
    }
}
```

#### Assertions

```java
import static org.junit.jupiter.api.Assertions.*;

@Test
void testAssertions() {
    // Basic assertions
    assertEquals(expected, actual);
    assertNotEquals(unexpected, actual);
    assertTrue(condition);
    assertFalse(condition);
    assertNull(object);
    assertNotNull(object);
    
    // Collection assertions
    assertIterableEquals(expectedList, actualList);
    assertArrayEquals(expectedArray, actualArray);
    
    // Exception assertions
    assertThrows(IllegalArgumentException.class, () -> {
        service.invalidOperation();
    });
    
    // Timeout assertions
    assertTimeout(Duration.ofSeconds(1), () -> {
        service.fastOperation();
    });
    
    // Multiple assertions
    assertAll(
        () -> assertEquals("John", student.getFirstName()),
        () -> assertEquals("Doe", student.getLastName()),
        () -> assertEquals(3.5, student.getGpa())
    );
}
```

#### Parameterized Tests

```java
@ParameterizedTest
@ValueSource(doubles = {0.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0})
void isEligible_withVariousGpas_shouldValidateCorrectly(double gpa) {
    Student student = new Student();
    student.setGpa(gpa);
    
    boolean result = eligibilityService.isEligible(student);
    
    assertEquals(gpa >= 3.0, result);
}

@ParameterizedTest
@CsvSource({
    "3.5, true",
    "2.8, false",
    "4.0, true",
    "2.0, false"
})
void isEligible_withGpaAndExpectedResult_shouldMatch(double gpa, boolean expected) {
    Student student = new Student();
    student.setGpa(gpa);
    
    boolean result = eligibilityService.isEligible(student);
    
    assertEquals(expected, result);
}
```

### Mocking with Mockito

#### Creating Mocks

```java
@ExtendWith(MockitoExtension.class)
class ScholarshipServiceTest {
    
    @Mock
    private ScholarshipRepository scholarshipRepository;
    
    @Mock
    private ApplicationRepository applicationRepository;
    
    @InjectMocks
    private ScholarshipService scholarshipService;
    
    @Test
    void testWithMocks() {
        // Use mocks in test
    }
}
```

#### Stubbing Methods

```java
@Test
void findScholarship_whenExists_shouldReturnScholarship() {
    // Given
    Scholarship scholarship = new Scholarship();
    scholarship.setId("sch-123");
    
    when(scholarshipRepository.findById("sch-123"))
        .thenReturn(Optional.of(scholarship));
    
    // When
    Scholarship result = scholarshipService.findById("sch-123");
    
    // Then
    assertNotNull(result);
    assertEquals("sch-123", result.getId());
}
```

#### Verifying Interactions

```java
@Test
void createScholarship_shouldSaveToRepository() {
    // Given
    Scholarship scholarship = new Scholarship();
    
    // When
    scholarshipService.create(scholarship);
    
    // Then
    verify(scholarshipRepository).save(scholarship);
    verify(scholarshipRepository, times(1)).save(any(Scholarship.class));
    verify(scholarshipRepository, never()).delete(any());
}
```

#### Argument Captors

```java
@Test
void createApplication_shouldSetCorrectStatus() {
    // Given
    ArgumentCaptor<Application> captor = ArgumentCaptor.forClass(Application.class);
    
    // When
    scholarshipService.apply(student, scholarship);
    
    // Then
    verify(applicationRepository).save(captor.capture());
    Application savedApplication = captor.getValue();
    assertEquals(ApplicationStatus.PENDING, savedApplication.getStatus());
}
```

### Test Data with Instancio

```java
import org.instancio.Instancio;
import static org.instancio.Select.field;

@Test
void testWithInstancio() {
    // Generate random test data
    Student student = Instancio.create(Student.class);
    
    // Customize specific fields
    Scholarship scholarship = Instancio.of(Scholarship.class)
        .set(field(Scholarship::getAmount), 5000.00)
        .set(field(Scholarship::getStatus), ScholarshipStatus.ACTIVE)
        .create();
    
    // Generate lists
    List<Student> students = Instancio.ofList(Student.class)
        .size(10)
        .create();
}
```

---

## Integration Testing

### Spring Boot Integration Tests

```java
@SpringBootTest
@AutoConfigureMockMvc
class ScholarshipControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void createScholarship_shouldReturn201() throws Exception {
        ScholarshipRequest request = new ScholarshipRequest();
        request.setName("Test Scholarship");
        request.setAmount(5000.00);
        
        mockMvc.perform(post("/api/v1/scholarships")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.name").value("Test Scholarship"));
    }
}
```

### Testcontainers

Use Testcontainers for integration tests with real dependencies:

```java
@Testcontainers
@SpringBootTest
class ScholarshipRepositoryIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("edumatch_test")
        .withUsername("test")
        .withPassword("test");
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Autowired
    private ScholarshipRepository scholarshipRepository;
    
    @Test
    void saveScholarship_shouldPersistToDatabase() {
        // Given
        Scholarship scholarship = new Scholarship();
        scholarship.setName("Integration Test Scholarship");
        
        // When
        Scholarship saved = scholarshipRepository.save(scholarship);
        
        // Then
        assertNotNull(saved.getId());
        
        Scholarship found = scholarshipRepository.findById(saved.getId()).orElseThrow();
        assertEquals("Integration Test Scholarship", found.getName());
    }
}
```

### Testing REST APIs with RestAssured

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ScholarshipApiTest {
    
    @LocalServerPort
    private int port;
    
    @BeforeEach
    void setup() {
        RestAssured.port = port;
    }
    
    @Test
    void getScholarships_shouldReturnList() {
        given()
            .contentType(ContentType.JSON)
        .when()
            .get("/api/v1/scholarships")
        .then()
            .statusCode(200)
            .body("content", hasSize(greaterThan(0)))
            .body("content[0].id", notNullValue());
    }
}
```

---

## Test Coverage

### JaCoCo Configuration

JaCoCo is configured in the parent POM to enforce 80% coverage:

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
        <execution>
            <id>check</id>
            <goals>
                <goal>check</goal>
            </goals>
            <configuration>
                <rules>
                    <rule>
                        <element>BUNDLE</element>
                        <limits>
                            <limit>
                                <counter>LINE</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.80</minimum>
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Running Coverage Reports

```powershell
# Generate coverage report
mvn test jacoco:report

# Check coverage threshold
mvn jacoco:check

# View report
# Open target/site/jacoco/index.html in browser
```

### Coverage Metrics

- **Line Coverage**: Percentage of code lines executed
- **Branch Coverage**: Percentage of decision branches executed
- **Method Coverage**: Percentage of methods executed
- **Class Coverage**: Percentage of classes executed

### Excluding from Coverage

Exclude generated code, DTOs, and configuration classes:

```java
@Generated  // Exclude from coverage
public class GeneratedClass {
    // ...
}
```

---

## Testing Tools

### Core Testing Stack

| Tool | Purpose | Version |
|------|---------|---------|
| **JUnit 5** | Test framework | Latest |
| **Mockito** | Mocking framework | Latest |
| **AssertJ** | Fluent assertions | Latest |
| **Instancio** | Test data generation | 5.0.2 |
| **Testcontainers** | Integration testing | Latest |
| **RestAssured** | API testing | 5.5.0 |
| **JaCoCo** | Code coverage | 0.8.11 |

### AssertJ Examples

```java
import static org.assertj.core.api.Assertions.*;

@Test
void testWithAssertJ() {
    // String assertions
    assertThat(scholarship.getName())
        .isNotNull()
        .startsWith("Merit")
        .contains("Scholarship")
        .endsWith("2025");
    
    // Numeric assertions
    assertThat(scholarship.getAmount())
        .isGreaterThan(0)
        .isLessThanOrEqualTo(10000)
        .isBetween(1000.0, 5000.0);
    
    // Collection assertions
    assertThat(scholarships)
        .isNotEmpty()
        .hasSize(5)
        .extracting(Scholarship::getName)
        .contains("Merit Scholarship", "STEM Award");
    
    // Exception assertions
    assertThatThrownBy(() -> service.invalidOperation())
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessage("Invalid operation")
        .hasNoCause();
}
```

---

## Best Practices

### 1. Test One Thing at a Time

❌ **Bad:**
```java
@Test
void testEverything() {
    // Tests creation, update, deletion all in one
}
```

✅ **Good:**
```java
@Test
void createScholarship_shouldSaveToRepository() { }

@Test
void updateScholarship_shouldModifyExisting() { }

@Test
void deleteScholarship_shouldRemoveFromRepository() { }
```

### 2. Use Descriptive Test Names

❌ **Bad:**
```java
@Test
void test1() { }
```

✅ **Good:**
```java
@Test
void calculateGpa_withAllAGrades_shouldReturn4Point0() { }
```

### 3. Keep Tests Independent

Each test should be able to run independently:

```java
@BeforeEach
void setup() {
    // Reset state before each test
    scholarshipRepository.deleteAll();
}
```

### 4. Don't Test Implementation Details

❌ **Bad:**
```java
@Test
void shouldCallPrivateMethod() {
    // Testing internal implementation
}
```

✅ **Good:**
```java
@Test
void calculateTotal_shouldReturnCorrectSum() {
    // Testing public behavior
}
```

### 5. Use Test Fixtures

Create reusable test data:

```java
class TestFixtures {
    static Student createEligibleStudent() {
        Student student = new Student();
        student.setGpa(3.5);
        student.setAge(20);
        return student;
    }
    
    static Scholarship createActiveScholarship() {
        Scholarship scholarship = new Scholarship();
        scholarship.setStatus(ScholarshipStatus.ACTIVE);
        scholarship.setAmount(5000.00);
        return scholarship;
    }
}
```

### 6. Test Edge Cases

```java
@Test
void processApplications_whenEmptyList_shouldReturnEmptyResult() { }

@Test
void calculateGpa_whenNoGrades_shouldThrowException() { }

@Test
void findScholarships_whenMaxIntResults_shouldHandleCorrectly() { }
```

### 7. Use Meaningful Assertions

❌ **Bad:**
```java
assertTrue(result.getStatus() == ApplicationStatus.PENDING);
```

✅ **Good:**
```java
assertEquals(ApplicationStatus.PENDING, result.getStatus());
// Or with AssertJ
assertThat(result.getStatus()).isEqualTo(ApplicationStatus.PENDING);
```

---

## Common Patterns

### Testing Async Methods

```java
@Test
void asyncMethod_shouldCompleteSuccessfully() throws Exception {
    CompletableFuture<Result> future = service.asyncOperation();
    
    Result result = future.get(5, TimeUnit.SECONDS);
    
    assertNotNull(result);
}
```

### Testing with Time

```java
@Test
void isExpired_whenDeadlinePassed_shouldReturnTrue() {
    // Use fixed clock for testing
    Clock fixedClock = Clock.fixed(
        Instant.parse("2025-12-31T23:59:59Z"),
        ZoneId.of("UTC")
    );
    
    Scholarship scholarship = new Scholarship();
    scholarship.setDeadline(LocalDate.of(2025, 12, 30));
    
    boolean result = scholarship.isExpired(fixedClock);
    
    assertTrue(result);
}
```

### Testing Transactions

```java
@Test
@Transactional
void transactionalTest_shouldRollback() {
    // Changes will be rolled back after test
    scholarshipRepository.save(scholarship);
}
```

---

## Resources

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [AssertJ Documentation](https://assertj.github.io/doc/)
- [Testcontainers Documentation](https://www.testcontainers.org/)
- [JaCoCo Documentation](https://www.jacoco.org/jacoco/trunk/doc/)

---

**Last Updated**: 2025-12-05  
**Version**: 1.0
