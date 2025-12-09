package com.minh.subscription.data.repository;

import com.minh.model.dto.subscription.MonthlyRevenueDto;
import com.minh.model.dto.subscription.RevenueByUserTypeDto;
import com.minh.subscription.data.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    List<PaymentEntity> findAllByUserIdOrderByPaidAtDesc(String userId);


    Optional<PaymentEntity> findByIdAndActive(Long id, Boolean active);

    @Modifying
    @Query("UPDATE PaymentEntity p SET p.active = false WHERE p.id = :id")
    void updateActiveById(@Param("id") Long id);

    Optional<PaymentEntity> findByTransactionIdAndActive(String transactionId, Boolean active);

    // Doanh thu theo tháng
    @Query("SELECT new com.minh.model.dto.subscription.MonthlyRevenueDto(" +
            "YEAR(o.paidAt), MONTH(o.paidAt), SUM(o.amount)) " +
            "FROM PaymentEntity o " +
            "WHERE o.status = 'PAID' AND o.paidAt IS NOT NULL " +
            "GROUP BY YEAR(o.paidAt), MONTH(o.paidAt) " +
            "ORDER BY YEAR(o.paidAt), MONTH(o.paidAt)")
    List<MonthlyRevenueDto> getMonthlyRevenue();

    @Query("""
    SELECT new com.minh.model.dto.subscription.MonthlyRevenueDto(
        CAST(EXTRACT(YEAR FROM o.paidAt) AS integer),
        CAST(EXTRACT(MONTH FROM o.paidAt) AS integer),
        SUM(o.amount)
    )
    FROM PaymentEntity o
    WHERE o.status = 'PAID' AND o.paidAt IS NOT NULL
    GROUP BY CAST(EXTRACT(YEAR FROM o.paidAt) AS integer), CAST(EXTRACT(MONTH FROM o.paidAt) AS integer)
    ORDER BY CAST(EXTRACT(YEAR FROM o.paidAt) AS integer), CAST(EXTRACT(MONTH FROM o.paidAt) AS integer)
    """)
    List<MonthlyRevenueDto> getRevenueByMonth();

    // Tổng tiền theo userType
    @Query("SELECT new com.minh.model.dto.subscription.RevenueByUserTypeDto(o.subscription.userType, SUM(o.amount)) " +
            "FROM PaymentEntity o " +
            "WHERE o.status = 'PAID' " +
            "GROUP BY o.subscription.userType")
    List<RevenueByUserTypeDto> getRevenueByUserType();
}
