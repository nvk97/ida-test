<script>
import svgTemplate from '@/components/UI/svgTemplate.vue'

export default {
  components: {
    svgTemplate,
  },
  data(){
    return{
      dropdownIsShowed:false
    }
  },
  methods:{
    changeDropdownState(state){
      this.dropdownIsShowed = state;
    },
    hideDropdown(){
      this.dropdownIsShowed = false;
    }
  }
}
</script>


<template>
  <div v-click-outside="hideDropdown" class="select" >
    <div 
      class="select-input" 
      :class="{'showed':dropdownIsShowed}" 
      @click="changeDropdownState(!dropdownIsShowed)">
      <div class="select-input__active-option">По умолчанию</div>
      <svg-template 
        class="select-input__chevron" 
        :name="'chevron-down'" 
        :class="{'showed':dropdownIsShowed}"
      />
    </div>
    <div class="select-dropdown" :class="{'showed':dropdownIsShowed}" >
      <div v-for="i in 3" :key="i" class="select-dropdown__option">По умолчанию</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  &-input {
    background: #fffefb;
    box-shadow: $box-shadow;
    border-radius: 4px;
    color: $gray;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    z-index: 10;
    &__chevron {
      width: 10px;
      height: 6px;
      transform: rotate(0);
      transition: transform 0.2s ease-in-out;
      &.showed {
        transform: rotate(180deg);
      }
    }
    &__active-option {
      font-size: 12px;
      margin-right: 5px;
    }
    &:hover, &.showed {
      box-shadow: $box-shadow__hover;
      color: $gray-b;
    }
  }
  &-dropdown{
    position: absolute;
    min-width: 100%;
    margin-top: 2px;
    background: #fffefb;
    box-shadow: $box-shadow;
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: 0.15s ease-out;
    padding: 10px 16px;
    visibility: hidden;
    transform: translateY(10px);
    opacity: 0;
    z-index: 9;
    &.showed{
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    }
    &__option{
      font-size: 12px;
      color: $gray;
      &:not(:last-child){
        margin-bottom: 10px;
      }
    }
  }
}
</style>