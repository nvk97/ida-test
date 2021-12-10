<script>
import { isEqual } from 'lodash'
import svgTemplate from '@/components/UI/svgTemplate.vue'

export default {
  components: {
    svgTemplate,
  },
  props: {
    selectData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      state:'hidden',
      dropdownIsShowed: false,
      selectedOption: null,
      selectedSortType: null,
    }
  },
  computed: {
    isMultiSortType() {
      return this.selectedOption.sortTypes.length === 2
    },
  },
  created() {
    this.selectedOption = this.selectData.find((select) => select?.isDefault)
  },
  mounted(){
    this.checkLocalStorage()
  },
  methods: {
    changeDropdownState(state) {
      this.dropdownIsShowed = state
    },
    hideDropdown() {
      this.dropdownIsShowed = false
    },
    selectOption(select) {
      if (isEqual(this.selectedOption.id, select.id)) this.changeSortType()
      else {
        this.selectedOption = select
        if (select.sortTypes.length === 2) [this.selectedSortType] = select.sortTypes
        else [this.selectedSortType] = select.sortTypes
      }
      this.hideDropdown()
      this.$emit('sort-products-list',{...this.selectedOption,sortType:this.selectedSortType})
    },
    changeSortType() {
      const sortIndex = this.selectedOption.sortTypes.indexOf(this.selectedSortType)+1
      this.selectedSortType =
        sortIndex !== this.selectedOption.sortTypes.length
          ? this.selectedOption.sortTypes[sortIndex]
          : this.selectedOption.sortTypes[0]
    },
    checkLocalStorage(){
      this.selectedOption = JSON.parse(`${localStorage.getItem('sortProductsList')}`) ||  this.selectedOption
      this.selectedSortType = JSON.parse(`${localStorage.getItem('sortProductsList')}`)?.sortType || null
      this.state = 'displayed'
    }
  },
}
</script>


<template>
  <div v-click-outside="hideDropdown" class="select" :class="{'select--hidden':state ==='hidden'}">
    <div
      class="select-input"
      :class="{ showed: dropdownIsShowed }"
      @click.stop="changeDropdownState(!dropdownIsShowed)"
    >
      <div class="select-input__active-option">
        <span>{{ selectedOption.name }}</span>
        <svg-template
          v-if="isMultiSortType"
          class="select-input__sort-icon"
          :name="`sort-${selectedSortType}`"
          :class="{ showed: dropdownIsShowed }"
        />
      </div>
      <svg-template
        class="select-input__chevron"
        :name="'chevron-down'"
        :class="{ showed: dropdownIsShowed }"
      />
    </div>
    <div class="select-dropdown" :class="{ showed: dropdownIsShowed }">
      <div
        v-for="select in selectData"
        :key="select.id"
        class="select-dropdown__option"
        :class="{ 'select-dropdown__option--selected': select.id === selectedOption.id }"
        @click="selectOption(select)"
      >
        <span>{{ select.name }}</span>
        <svg-template
          v-if="select.id === selectedOption.id"
          class="select-dropdown__option__check-icon"
          :name="'check'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  position: relative;
  opacity: 1;
  visibility:visible;
  transition: opacity 0.3s ease-in;
  &-input {
    width: 160px;
    background: #fffefb;
    box-shadow: $box-shadow;
    border-radius: 4px;
    color: $gray;
    padding: 10px 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
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
      flex-grow: 1;
      font-size: 12px;
      margin-right: 5px;
    }
    &__sort-icon {
      height: 8px;
      width: 8px;
      margin-left: 3px;
    }
    &:hover,
    &.showed {
      box-shadow: $box-shadow__hover;
      color: $gray-b;
    }
  }
  &-dropdown {
    position: absolute;
    min-width: 100%;
    margin-top: 2px;
    background: #fffefb;
    box-shadow: $box-shadow;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    cursor: pointer;
    transition: 0.15s ease-out;
    padding: 10px 16px;
    visibility: hidden;
    transform: translateY(10px);
    opacity: 0;
    z-index: 9;
    &.showed {
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    }
    &__option {
      font-size: 12px;
      width: 100%;
      color: $gray;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      &__check-icon {
        width: 10px;
        height: 10px;
      }
      &:hover,
      &:focus,
      &--selected {
        color: $gray-b;
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
  &--hidden{
    opacity: 0;
    visibility:hidden;
  }
}
</style>