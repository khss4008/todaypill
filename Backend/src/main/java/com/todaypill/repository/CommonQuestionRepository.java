package com.todaypill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todaypill.db.entity.CommonQuestion;

@Repository
public interface CommonQuestionRepository extends JpaRepository<CommonQuestion, Integer>{
    @Query(value = "select * from commonquestion where user_id = ?1", nativeQuery = true)
    CommonQuestion findOneByUserId(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set diabetes = true where user_id = ?1", nativeQuery = true)
    void updateFe(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set anemia = true, outdoor_activity = 3 where user_id = ?1", nativeQuery = true)
    void updateVitaminD(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set balanced_meal = false, lack = '생선,육류' where user_id = ?1", nativeQuery = true)
    void updateMultivitamin(Integer userId);
    
    
    @Modifying
    @Query(value = "update commonquestion set heartburn = true where user_id = ?1", nativeQuery = true)
    void updateVitaminC(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set kidney_disease = true where user_id = ?1", nativeQuery = true)
    void updateOmega3(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set migraine = true, physical_activity = true where user_id = ?1", nativeQuery = true)
    void updateMagnesium(Integer userId);
    @Modifying
    @Query(value = "update commonquestion set balanced_meal =false, lack = '생선,육류', stomatitis = true where user_id = ?1", nativeQuery = true)
    void updateVitaminB(Integer userId);
    
    @Modifying
    @Query(value = "update commonquestion set backache = true, problem = '관절' where user_id = ?1", nativeQuery = true)
    void updateCollagen(Integer userId);
    
    
}
