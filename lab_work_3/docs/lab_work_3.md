
# Диаграмма контейнеров

![container_diagram](./pics/container-diagram.png)

# Диаграмма компонентов

![cryptography_service_component_diagram](./pics/cryptography-service-component-diagram.png)

# UML-диаграммы

## Use-case диаграмма

Для составления диаграммы последовательностей был выбран прецедент "Добавить вызов функции "Получить хеш файла по стандарту ГОСТ 34.11-2018" в объект типа "Алгоритмы"".

![use_case_diagram](./pics/use-case-diagram.png)

## Диаграмма последовательностей для прецедента

![precedent_diagram](./pics/precedent-diagram.png)

# Модель БД

![concept_diagram](./pics/concept-diagram.png)

# Применение основных принципов разработки

```typescript

export abstract class WayFilterComparator {
    private readonly wayDataComparatorDispatcher: WayDataComparatorDispatcher;

    public filterItems = async (items: Set<WfWayItem>, 
                                columnIdent: string, 
                                args: Array<string>, 
                                rsqlOperation: RsqlSearchOperation): Promise<Set<WfWayItem>> => {
        const wayDataComparator: WayDataComparator = 
            this.wayDataComparatorDispatcher.getColumn(columnIdent);

        if (wayDataComparator === null) {
            return new Set<WfWayItem>(items);
        }

        const filteredItems: Set<WfWayItem> = new Set();

        items.forEach((item: WfWayItem) => {
            const whetherToAdd: boolean = this.filterItem(wayDataComparator, 
                                                          item, 
                                                          args, 
                                                          rsqlOperation);

            if (whetherToAdd) {
                filteredItems.add(item);
            }
        });

        return filteredItems;
    }

    public abstract supportsRsqlOperation(rsqlOperation: RsqlOperation): boolean;

    protected abstract filterItem(wayDataComparator: WayDataComparator, 
                                  item: WfWayItem, 
                                  args: Array<string>, 
                                  rsqlOperation: RsqlSearchOperation): boolean;
}
```

# Дополнительные принципы разработки


