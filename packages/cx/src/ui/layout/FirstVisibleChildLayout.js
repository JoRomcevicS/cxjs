import {PureContainer} from "../PureContainer";
import {MenuItem} from "../../widgets/nav";

function isVisibleDeep(instance) {
   if (instance.visible && !instance.widget.isPureContainer)
      return true;
   if (instance.children) {
      for (let i = 0; i < instance.children.length; i++)
         if (isVisibleDeep(instance.children[i]))
            return true;
   }
   return false;
}

class FirstVisibleChildItem extends PureContainer {

   explore(context, instance) {
      if (instance.parent.firstVisibleChild)
         return;
      super.explore(context, instance);
   }

   exploreCleanup(context, instance) {
      if (instance.parent.firstVisibleChild)
         return;
      if (isVisibleDeep(instance))
         instance.parent.firstVisibleChild = instance;
   }

   render(context, instance, key) {
      if (instance.parent.firstVisibleChild != instance)
         return null;
      return super.render(context, instance, key)
   }
}

export class FirstVisibleChildLayout extends PureContainer {

   explore(context, instance) {
      instance.firstVisibleChild = null;
      for (let i = this.items.length - 1; i >= 0; i--) {
         let x = instance.getChild(context, this.items[i]);
         x.scheduleExploreIfVisible(context);
      }
   }

   exploreCleanup(context, instance) {
      instance.children = [];
      if (instance.firstVisibleChild)
         instance.children.push(instance.firstVisibleChild);
   }

   wrapItem(item) {
      return item instanceof FirstVisibleChildItem ? item : FirstVisibleChildItem.create({items: item});
   }
}